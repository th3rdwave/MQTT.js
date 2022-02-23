import { IMessageIdProvider } from './message-id-provider';

/**
 * DefaultMessageIdProvider
 * This is compatible behavior with the original MQTT.js internal messageId allocation.
 */
declare class DefaultMessageIdProvider implements IMessageIdProvider {
  /**
   * DefaultMessageIdProvider constructor.
   * Randomize initial messageId
   * @constructor
   */
  constructor();

  /**
   * Return the current messageId and increment the current messageId.
   * @return {number} - messageId
   */
  public allocate(): number | null;

  /**
   * Get the last allocated messageId.
   * @return {number} - messageId.
   */
  public getLastAllocated(): number | null;

  /**
   * Register the messageId.
   * This function actually nothing and always return true.
   * @param {number} num - The messageId to request use.
   * @return {boolean} - If `num` was not occupied, then return true, otherwise return false.
   */
  public register(num: number): boolean;

  /**
   * Deallocate the messageId.
   * This function actually nothing.
   * @param {number} num - The messageId to deallocate.
   */
  public deallocate(num: number): void;

  /**
   * Clear all occupied messageIds.
   * This function actually nothing.
   */
  public clear(): void;
}

export { DefaultMessageIdProvider };
