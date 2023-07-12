function salaryFormatter(amount, format="en-US", currSymbol="USD") {
    return new Intl.NumberFormat(format, {style: "currency", currency: currSymbol}).format(amount)
}

export default salaryFormatter;