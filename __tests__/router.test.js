/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from "../scripts/router";

describe('Test history length after pushToHistory', () => {
    test('initial stack length', () => {
        expect(history.length).toBe(1);
    });

    test('push settings length', () => {
        pushToHistory("settings");
        expect(history.length).toBe(2);
    });

    test('push entries length', () => {
        pushToHistory("entry", 1);
        pushToHistory("entry", 3);
        pushToHistory("entry", 5);
        expect(history.length).toBe(5);
    });

    test('push nonexistent page length', () => {
        pushToHistory(undefined);
        expect(history.length).toBe(6);
    });
});

describe('Test state after pushToHistory', () => {
    test('settings', () => {
        pushToHistory("settings");
        expect(history.state.page).toEqual('settings');
        expect(location.href).toMatch(/\/#settings$/);
    });

    test('entry4', () => {
        pushToHistory("entry", 4);
        expect(history.state.page).toEqual('entry4');
        expect(location.href).toMatch(/\/#entry4$/);
    });

    test('nonexistent page', () => {
        pushToHistory("12345NonExIsTantPAgE");
        expect(history.state).toStrictEqual({});
        expect(location.href).toMatch(/\/$/);
    });
});