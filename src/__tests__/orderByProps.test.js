import { orderByProps, getSpecialAttacks } from '../orderByProps';

describe('orderByProps', () => {
	it('orders properties according to given order and then alphabetically', () => {
		const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
		const order = ["name", "level"];
		const result = orderByProps(obj, order);
		const expected = [
			{ key: 'name', value: 'мечник' },
			{ key: 'level', value: 2 },
			{ key: 'attack', value: 80 },
			{ key: 'defence', value: 40 },
			{ key: 'health', value: 10 }
		];
		expect(result).toEqual(expected);
	});

	it('returns only alphabetically sorted properties if order is empty', () => {
		const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
		const order = [];
		const result = orderByProps(obj, order);
		const expected = [
			{ key: 'attack', value: 80 },
			{ key: 'defence', value: 40 },
			{ key: 'health', value: 10 },
			{ key: 'level', value: 2 },
			{ key: 'name', value: 'мечник' }
		];
		expect(result).toEqual(expected);
	});

	it('handles properties not in the object gracefully', () => {
		const obj = { name: 'мечник', health: 10 };
		const order = ["name", "level"];
		const result = orderByProps(obj, order);
		const expected = [
			{ key: 'name', value: 'мечник' },
			{ key: 'level', value: undefined },
			{ key: 'health', value: 10 }
		];
		expect(result).toEqual(expected);
	});
});

describe('getSpecialAttacks', () => {
	it('returns special attacks with default description if not provided', () => {
		const character = {
			name: 'Лучник',
			type: 'Bowman',
			health: 50,
			level: 3,
			attack: 40,
			defence: 10,
			special: [
				{
					id: 8,
					name: 'Двойной выстрел',
					icon: 'http://...',
					description: 'Двойной выстрел наносит двойной урон'
				},
				{
					id: 9,
					name: 'Нокаутирующий удар',
					icon: 'http://...'
					// описание отсутствует
				}
			]
		};
		const result = getSpecialAttacks(character);
		const expected = [
			{
				id: 8,
				name: 'Двойной выстрел',
				icon: 'http://...',
				description: 'Двойной выстрел наносит двойной урон'
			},
			{
				id: 9,
				name: 'Нокаутирующий удар',
				icon: 'http://...',
				description: 'Описание недоступно'
			}
		];
		expect(result).toEqual(expected);
	});

	it('handles an empty special array', () => {
		const character = {
			name: 'Лучник',
			type: 'Bowman',
			health: 50,
			level: 3,
			attack: 40,
			defence: 10,
			special: []
		};
		const result = getSpecialAttacks(character);
		const expected = [];
		expect(result).toEqual(expected);
	});

	it('handles special attacks with only the mandatory fields', () => {
		const character = {
			name: 'Лучник',
			type: 'Bowman',
			health: 50,
			level: 3,
			attack: 40,
			defence: 10,
			special: [
				{
					id: 1,
					name: 'Огненная стрела',
					icon: 'http://...'
					// описание отсутствует
				}
			]
		};
		const result = getSpecialAttacks(character);
		const expected = [
			{
				id: 1,
				name: 'Огненная стрела',
				icon: 'http://...',
				description: 'Описание недоступно'
			}
		];
		expect(result).toEqual(expected);
	});
});