import type { UUID } from 'crypto';
import { getMessage } from './error.ts';

/**
 * Interface for data access repository - defines all baseline operations
 */
export interface IRepository<
	TModelRaw,
	TModelMin extends TModelRaw = TModelRaw,
	TModelFull extends TModelMin = TModelMin,
> {
	/**
	 * Retrieves a record from the database by its UUID
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getByIdMin(id: UUID): Promise<TModelMin | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	getByIdFull(id: UUID): Promise<TModelFull | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	getAll(): Promise<TModelMin[]>;

	/**
	 * Creates a new record in the database
	 * @param data Data to insert into database
	 * @returns The created record
	 */
	create(data: TModelRaw): Promise<TModelMin>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	update(id: UUID, data: Partial<TModelRaw>): Promise<TModelMin | null>;
}

/**
 * Abstract for data access repository - defines all baseline operations and provides basic functionality
 */
export abstract class Repository<
	TModelRaw,
	TModelMin extends TModelRaw = TModelRaw,
	TModelFull extends TModelMin = TModelMin,
> implements IRepository<TModelRaw, TModelMin, TModelFull> {
	abstract descriptor: string;

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
	abstract getByIdMin(id: UUID): Promise<TModelMin | null>;

	/**
	 * Retrieves a record from the database by its UUID and hydrates any foreign key relationships
	 * @param id UUID of the record to retrieve
	 * @returns The record with the given UUID, or null if not found
	 */
	abstract getByIdFull(id: UUID): Promise<TModelFull | null>;

	/**
	 * Retrieves all records from the database
	 * @returns An array of all records (empty array if none found)
	 */
	abstract getAll(): Promise<TModelMin[]>;

	/**
	 * Creates a new record in the database
	 * @param data Data to insert into database
	 * @returns The inserted record
	 */
	abstract create(data: TModelRaw): Promise<TModelMin>;

	/**
	 * Updates an existing database record with new data
	 * @param id UUID of the existing record to update
	 * @param data New data to update the record with
	 * @returns The updated record
	 */
	abstract update(
		id: UUID,
		data: Partial<TModelRaw>,
	): Promise<TModelMin | null>;
}
