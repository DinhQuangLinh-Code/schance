export const numberWithCommas = x => {
    var parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
}

export const distinctArray = x => {
    return Array.from(new Set(x.map(s => s.value))).map(val => {
        return {
            value: val,
            key: x.find(i => i.value === val).key
        }
    })
}

export const isFilterSelected = filter => {
    return filter && filter.key !== '-1'
}

export const isFilterNotSelected = filter => {
    return !filter || filter.key === '-1'
}

export const buildCompanyImageForProduct = (companies, products) => {
    for (const p of products) {
        for (const c of companies) {
            if (p.company.id === c._id) {
                p.company.logo = c.logo
            }
        }
    }

    return products
}

export const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0
}
