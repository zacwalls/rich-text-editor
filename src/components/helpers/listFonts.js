function FontOptions() {
  const fonts = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
  ];

  const options = [];

  for (let font of fonts) {
    const fontFamily = { fontFamily: font };
    options.push(
      <option style={fontFamily} value={font}>
        {font}
      </option>
    );
  }

  return options;
}

export default FontOptions;
