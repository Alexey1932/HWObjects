export function orderByProps(obj, order) {
	const result = [];

	for (const key of order) {
		// Используем тернарный оператор для значения по умолчанию, если ключ не найден
		result.push({ key, value: obj[key] !== undefined ? obj[key] : undefined });
	}

	const remainingKeys = Object.keys(obj)
		.filter(key => !order.includes(key))
		.sort();

	for (const key of remainingKeys) {
		result.push({ key, value: obj[key] });
	}

	return result;
}

export function getSpecialAttacks(character) {
	return character.special.map(({ id, name, icon, description = 'Описание недоступно' }) => ({
		id,
		name,
		icon,
		description
	}));
}