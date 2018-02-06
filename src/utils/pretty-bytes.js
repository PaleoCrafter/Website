const UNITS = 'KMGTPE';

module.exports = (bytes, unit = 1024, fixed = 2) => {
    if (!Number.isFinite(bytes)) {
        throw new TypeError(`Expected a finite number, got ${typeof bytes}: ${bytes}`);
    }


    if (bytes < unit) {
        return `${bytes} B`;
    }

    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(unit)), UNITS.length);
    const numStr = Number((bytes / (unit ** exponent)).toFixed(fixed));

    return `${numStr} ${UNITS.charAt(exponent - 1)}iB`;
};
