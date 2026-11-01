#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2f6776d92bbef36dc6c65e9fe97059874b2ffefdfb25ee616702189f05988a3b/contract';
import endContract from '../../snapshots/2f6776d92bbef36dc6c65e9fe97059874b2ffefdfb25ee616702189f05988a3b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'user_gender',
        members: ['male', 'female', 'other'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'user_status',
        members: ['active', 'inactive', 'banned'],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('date_of_birth', 'date', { codecRef: { codecId: 'pg/date-temporal@1' } }),
          col('deleted_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('first_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('gender', '"user_gender"', {
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'user_gender' } },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('last_name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phoneNumber', 'character varying(11)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 11 } },
          }),
          col('status', '"user_status"', {
            notNull: true,
            default: lit('active'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'user_status' } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_username_key',
        columns: ['username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_email_idx_df981568',
        columns: ['email'],
        extras: { where: sql`"deleted_at" IS NULL`, unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_phoneNumber_idx_670fb391',
        columns: ['phoneNumber'],
        extras: { where: sql`"deleted_at" IS NULL`, unique: true },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
