import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { useField } from 'formik';
import { useQuery } from 'react-query';
import { Stop } from './../types/Trip';

function fetchAutocomplete(key: string, queryText: string): Promise<Stop[]> {
  const apiKey = process.env.REACT_APP_ROUTING_API_KEY;
  if (!queryText) {
    return Promise.resolve([]);
  }
  return window
    .fetch(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${queryText}`
    )
    .then(async (res) => {
      const data = await res.json();
      const stops = data.features as Stop[];
      return stops.map((item) => {
        const {
          type,
          geometry,
          properties: { name, label },
        } = item;
        const formatted = { type, geometry, properties: { name, label } };
        return formatted;
      });
    });
}

type ControlledAutocompleteProps = {
  name: string;
};

export default function ControlledAutocomplete({
  name,
}: ControlledAutocompleteProps) {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const [queryText, setQueryText] = useState('');
  const { isLoading, data } = useQuery(
    ['findStop', queryText],
    fetchAutocomplete
  );

  const inputItems = data || [];

  function handleInputValueChange({ inputValue }: { inputValue: string }) {
    setQueryText(inputValue);
  }
  function handleSelectedItemChange({ selectedItem }: { selectedItem: Stop }) {
    setValue(selectedItem);
    setQueryText(selectedItem.properties.label);
  }
  return (
    <>
      <DropdownCombobox
        items={inputItems}
        selectedItem={value}
        onSelectedItemChange={handleSelectedItemChange}
        inputValue={queryText}
        handleInputValueChange={handleInputValueChange}
      />
    </>
  );
}

type DropdownComboboxProps = {
  items: Stop[];
  selectedItem: Stop;
  onSelectedItemChange: (changeObject: any) => void;
  inputValue: string;
  handleInputValueChange: (changeObject: any) => void;
};

function DropdownCombobox({
  items,
  selectedItem,
  onSelectedItemChange,
  inputValue,
  handleInputValueChange,
}: DropdownComboboxProps) {
  const itemToString = (item: Stop | null) =>
    item ? item.properties.label : '' || '';

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
    onSelectedItemChange,
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
              key={`${item.properties.name}-${index}`}
              {...getItemProps({ item, index })}
            >
              {itemToString(item)}
            </li>
          ))}
      </ul>
    </div>
  );
}
