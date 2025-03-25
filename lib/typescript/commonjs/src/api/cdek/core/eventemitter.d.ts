type Entry<E, K extends keyof E> = {
    name: K;
    value: E[K];
};
export declare class EventEmitter<E extends Record<string, unknown[]>> {
    private listeners;
    private globalWriters;
    private onWriters;
    private limit;
    /**
     * @param maxListenersPerEvent - if set to 0, no limit is applied. defaults to 10
     */
    constructor(maxListenersPerEvent?: number);
    /**
     * Appends the listener to the listeners array of the corresponding eventName.
     * No checks are made if the listener was already added, so adding multiple
     * listeners will result in the listener being called multiple times.
     * If no listener is passed, it returns an asyncIterator which will fire
     * every time eventName is emitted.
     */
    on<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    on<K extends keyof E>(eventName: K): AsyncIterableIterator<E[K]>;
    /**
     * Adds a one-time listener function for the event named eventName.
     * The next time eventName is emitted, listener is called and then removed.
     * If no listener is passed, it returns a Promise that will resolve once
     * eventName is emitted.
     */
    once<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    once<K extends keyof E>(eventName: K): Promise<E[K]>;
    /**
     * Removes the listener from eventName.
     * If no listener is passed, all listeners will be removed from eventName,
     * this includes async listeners.
     * If no eventName is passed, all listeners will be removed from the EventEmitter,
     * including the async iterator for the class
     */
    off<K extends keyof E>(eventName?: K, listener?: (...args: E[K]) => void): Promise<this>;
    /**
     * Synchronously calls each of the listeners registered for the event named
     * eventName, in the order they were registered, passing the supplied
     * arguments to each.
     */
    protected emit<K extends keyof E>(eventName: K, ...args: E[K]): Promise<void>;
    [Symbol.asyncIterator]<K extends keyof E>(): AsyncIterableIterator<{
        [V in K]: Entry<E, V>;
    }[K]>;
}
export {};
//# sourceMappingURL=eventemitter.d.ts.map