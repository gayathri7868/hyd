import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const AutoCompleteInput = ({ placeholder, onSuggestionSelected }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const onSuggestionsFetchRequested = async ({ value }) => {
        if (value.trim().length > 2) {
            const response = await axios.get(`http://localhost:2000/api/stops/suggestions/${value}`);
            setSuggestions(response.data);
        }
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion.name}
        </div>
    );

    const inputProps = {
        placeholder,
        value,
        onChange: (event, { newValue }) => {
            setValue(newValue);
            onSuggestionSelected(newValue);
        }
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    );
};

export default AutoCompleteInput;
