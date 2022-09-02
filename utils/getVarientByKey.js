const getVarientByKey = (key, varients) => {
    const fallback = varients[0]
    const result = varients.filter(({ _key }) => _key == key)
    return key ? result[0] ?? fallback : fallback
    // fallback, Critical Situation
}
export default getVarientByKey