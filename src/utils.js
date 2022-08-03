const serialMatches = (serialNumber, serialPattern) => {
  if (!serialPattern) {
    return true;
  }

  if (serialPattern.startsWith('/') && serialPattern.endsWith('/')) {
    const regExp = new RegExp(serialPattern.slice(1, -1));
    return regExp.test(serialNumber);
  }

  if (serialPattern.includes('-')) {
    const [min, max] = serialPattern.split('-');
    return (
      parseInt(min, 10) <= serialNumber && parseInt(max, 10) >= serialNumber
    );
  }

  return serialNumber.toString() === serialPattern;
};

const getSeriesNumber = (blockChainSeriesNumber) => {
  return {
    1: '1',
    2: '2',
    3: 'Summer 2021',
    4: '3',
    5: '4',
  }[blockChainSeriesNumber];
};

module.exports = { serialMatches, getSeriesNumber };
