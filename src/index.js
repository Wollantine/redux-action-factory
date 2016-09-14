/**
 * Public interface
 *
 * This wrapper hides private methods intended only for testing the library.
 */

import * as lib from './action-factory-lib';

export const createAction = lib.createAction;
export const createRawAction = lib.createRawAction;
export const type = lib.type;
export const initialize = lib.initialize;
export const getConfig = lib.getConfig;
