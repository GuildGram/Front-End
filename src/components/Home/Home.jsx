import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import './home.css'
// import { useKeycloak } from "@react-keycloak/web";

const URLStart = "http://guildgram.com/";

export default function Home() {
    // const { keycloak } = useKeycloak();
    //populate data
    const getCharData = async () => {
        const res = await axios.get(URLStart+"/characters/getall");

        setCharData(res.data)
    }

    //delete character
    const deleteChar = async () => {
        await axios.delete(URLStart+"/characters/delete"+deleteID);
    }

    const addChar = async () => {
        await axios.post(URLStart+"characters/add",{
            "userid": charID,
            "class": charClass,
            "name": charName,
            "regionserver": charRegion,
            "characterlevel": charLevel,
            "rosterlevel": charRoster,
            "ilvl":charIlvl,
            })
    }
    //variables for add character
    const [charID, setCharID] = useState();
    const [charClass, setcharClass] = useState();
    const [charName, setcharName] = useState();
    const [charRegion, setcharRegion] = useState();
    const [charLevel, setcharLevel] = useState();
    const [charRoster, setcharRoster] = useState();
    const [charIlvl, setcharIlvl] = useState();


    //variables for API calls
    const [deleteID, setDeleteID] = useState();
    //character data for table 
    const [charData, setCharData] = useState();

    return (
        <div className='home'>
            {!!charData ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell align="right">Class</TableCell>
                                <TableCell align="right">Character Name</TableCell>
                                <TableCell align="right">Region / Server Name</TableCell>
                                <TableCell align="right">Character Level</TableCell>
                                <TableCell align="right">Roster Level</TableCell>
                                <TableCell align="right">Item Level</TableCell>
                                <TableCell align="right">Guild ID</TableCell>
                                <TableCell align="right">Guild Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {charData.map((row) => (
                                <TableRow
                                    key={row.userid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.userid}
                                    </TableCell>
                                    <TableCell align="right">{row.class}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.regionserver}</TableCell>
                                    <TableCell align="right">{row.characterlevel}</TableCell>
                                    <TableCell align="right">{row.rosterlevel}</TableCell>
                                    <TableCell align="right">{row.ilvl}</TableCell>
                                    <TableCell align="right">{row.guildid}</TableCell>
                                    <TableCell align="right">{row.guildrole}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : "No data"}
            <div className='btnContainer'>
                <button onClick={getCharData}>Populate Characters</button>
            </div>
            <div className='horizontal'>
                    <form>
                        <label>Enter ID
                            <input
                            type="string"
                            value={deleteID}
                            onChange={(e) => setDeleteID(e.target.value)}
                            />
                        </label>
                    </form>
            </div>
            <div className='btnContainer'>
                    <button onClick={deleteChar}>Delete Character</button>
            </div>
            

            <div>
                <form>
                <label>Character ID
                        <input
                        type="string"
                        value={charID}
                        onChange={(e) => setCharID(e.target.value)}
                        />
                    </label>
                    <label>Character Class
                        <input
                        type="string"
                        value={charClass}
                        onChange={(e) => setcharClass(e.target.value)}
                        />
                    </label>
                    <label>Character Name
                        <input
                        type="string"
                        value={charName}
                        onChange={(e) => setcharName(e.target.value)}
                        />
                    </label>
                    <label>Character Region
                        <input
                        type="string"
                        value={charRegion}
                        onChange={(e) => setcharRegion(e.target.value)}
                        />
                    </label>
                    <label>Character Level
                        <input
                        type="string"
                        value={charLevel}
                        onChange={(e) => setcharLevel(e.target.value)}
                        />
                    </label>
                    <label>Character Roster Level
                        <input
                        type="string"
                        value={charRoster}
                        onChange={(e) => setcharRoster(e.target.value)}
                        />
                    </label>
                    <label>Character Ilvl
                        <input
                        type="string"
                        value={charIlvl}
                        onChange={(e) => setcharIlvl(e.target.value)}
                        />
                    </label>
                </form>
            </div>

            <div className='btnContainer'>
                <button onClick={addChar}>Add Character</button>
            </div>
            <label>TESING FOR DEPLOYMENT PLS SEE ME HOSTED</label>
        </div>
    )
}
