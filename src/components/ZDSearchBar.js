import React, {useState, useEffect} from 'react';
import { MainView, SearchView } from './styles';
import SearchBar from 'material-ui-search-bar'
import {fetchFilesWithText, fetchFileNames} from '../Manager/ZDDataManager'

export function ZDSearchBar(props){
    const [searchText, setSearchText] = useState("")


    const handleRequestSearch = () => {
        fetchFilesWithText(searchText,false,(result)=>{

            props.updatedData(result)
        },()=>{
            alert("Error! Could not fetch files")
        })
    }

    const handleCancelSearch = () => {
        fetchFileNames((result) => {
            props.updatedData(result)
        })
    }

    return(
        <MainView>
            <SearchView>
                <SearchBar
                    value={searchText}
                    onChange={(text) => setSearchText(text)}
                    onRequestSearch={handleRequestSearch}
                    cancelOnEscape={true}
                    style={{width: '800px'}}
                    onCancelSearch={handleCancelSearch}
                />
            </SearchView>
        </MainView>
    )
}