import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SearchBox = ({ width = "15%" }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`w-[${width}]`}>
            <div className={`mb-4 relative transition-all duration-300 rounded-lg ${isFocused ? 'shadow-lg' : 'shadow-md'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass} 
                        className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-Dark-Blue-300' : 'text-gray-400'}`}
                    />
                </div>
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-2 pl-12 text-sm rounded-lg 
                            bg-white
                            transition-all duration-300 ease-in-out" 
                    placeholder="Search..." 
                    required 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
};

SearchBox.propTypes = {
    width: PropTypes.string
};

export default SearchBox; 