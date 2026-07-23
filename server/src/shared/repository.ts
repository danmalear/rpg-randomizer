import type { PrismaClient } from '#prisma-client';
import type { UUID } from 'crypto';
import { getMessage } from './error.ts';

export interface IRepositoryConfig {
	prisma: PrismaClient;
}

/**
 * Interface for data access repository - defines all baseline operations
 */
export interface IRepository<
	TModel,
	TCreate,
	TUpdate,
	TModelIncludeAll extends TModel = TModel,
> {
	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getByIdRaw(id: UUID): Promise<TModel | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getById(id: UUID): Promise<TModelIncludeAll | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	getAll(): Promise<TModel[]>;

	/**
	 * Creates a new record in the database
	 * @param data Data to insert into database
	 * @returns The created record
	 */
	create(data: TCreate): Promise<TModel>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	update(id: UUID, data: TUpdate): Promise<TModel>;
}

/**
 * Abstract for data access repository - defines all baseline operations and provides basic functionality
 */
export abstract class Repository<
	TModel,
	TCreateInput,
	TUpdateInput,
	TModelIncludeAll extends TModel = TModel,
> implements IRepository<TModel, TCreateInput, TUpdateInput, TModelIncludeAll>
{
	prisma: PrismaClient;
	abstract descriptor: string;

	constructor({ prisma }: IRepositoryConfig) {
		this.prisma = prisma;
	}

	getByIdError(id: UUID, e: unknown) {
		return new Error(
			`Error getting ${this.descriptor} by ID ${id}: ${getMessage(e)}`,
		);
	}

	getAllError(e: unknown) {
		return new Error(
			`Error getting all ${this.descriptor} records: ${getMessage(e)}`,
		);
	}

	createError(e: unknown) {
		return new Error(`Error creating new ${this.descriptor}: ${getMessage(e)}`);
	}

	updateError(id: UUID, e: unknown) {
		return new Error(
			`Error updating ${this.descriptor} with ID ${id}: ${getMessage(e)}`,
		);
	}

	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	abstract getByIdRaw(id: UUID): Promise<TModel | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	abstract getById(id: UUID): Promise<TModelIncludeAll | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	abstract getAll(): Promise<TModel[]>;

	/**
	 * Creates a new record in the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	abstract create(data: TCreateInput): Promise<TModel>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	abstract update(id: UUID, data: TUpdateInput): Promise<TModel>;
}
