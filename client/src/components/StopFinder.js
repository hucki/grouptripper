import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { Formik, useField, useFormik, Field } from 'formik';
import { useQuery } from 'react-query';

export default function StopFinder() {
  const [selectedItem, setSelectedItem] = useState(null);
  function handleSelectedItemChange({ selectedItem }) {
    setSelectedItem(selectedItem);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      stop: null,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          stop: null,
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
            />
            <ControlledAutocomplete
              id="stop"
              name="stop"
              // setFieldValue={formik.setFieldValue}
              // value={formik.values.stop}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
}

function fetchAutocomplete(key, queryText) {
  const apiKey = process.env.REACT_APP_ROUTING_API_KEY;
  if (!queryText) {
    console.log('no query');
    return Promise.resolve([]);
  }
  return window
    .fetch(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${queryText}`
    )
    .then(async (res) => {
      const data = await res.json();
      return data.features.map((item) => ({
        coordinates: item?.geometry?.coordinates,
        name: item?.properties?.name,
        label: item?.properties?.label,
      }));
    });
}

function ControlledAutocomplete({ name }) {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const [queryText, setQueryText] = useState('');

  const { isLoading, data } = useQuery(
    ['findStop', queryText],
    fetchAutocomplete
  );

  const inputItems = data || [];
  console.log('data', inputItems);

  function handleInputValueChange({ inputValue }) {
    setQueryText(inputValue);
  }
  function handleSelectedItemChange({ selectedItem }) {
    setValue(selectedItem);
  }
  return (
    <>
      <DropdownCombobox
        items={inputItems}
        selectedItem={value}
        handleSelectedItemChange={handleSelectedItemChange}
        inputValue={queryText}
        handleInputValueChange={handleInputValueChange}
      />
    </>
  );
}

function DropdownCombobox({
  items,
  selectedItem,
  handleSelectedItemChange,
  inputValue,
  handleInputValueChange,
}) {
  const itemToString = (item) => (item ? item.label : '');

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    itemToString,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: handleInputValueChange,
    inputValue,
  });

  return (
    <div>
      <label {...getLabelProps()}>Add a stop:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} className="p-1 border border-gray-700" />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item.primary}-${index}`}
              {...getItemProps({ item, index })}
            >
              {itemToString(item)}
            </li>
          ))}
      </ul>
    </div>
  );
}
