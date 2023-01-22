import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { getAutocompleteNames } from '../api/names';

const AutocompleteSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setSuggestions([]);
      if(debouncedQuery) {
        const names = await getAutocompleteNames(debouncedQuery, controller.signal);
        setSuggestions(names);
      }
    })();

    return () => controller.abort('Cancel Request');
  }, [debouncedQuery]);

  return (
      <div className="AutocompleteSearch">
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <div className='AutocompleteSearch__suggestions'>
          {suggestions.map(suggestion => <p key={suggestion.id}>{suggestion.firstName}</p>)}
        </div>
      </div>
  );
}

export default AutocompleteSearch;
