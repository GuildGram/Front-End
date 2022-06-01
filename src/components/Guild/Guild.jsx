import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import './guild.css'

const charSvcPort = "9090"
const guildSvcPort = "9091"
const URLStart = "http://localhost:"

export default function Guild() {
    const getGuildData = async () => {
        const res = await axios.get(URLStart+guildSvcPort+"/guilds/getall");

        setGuildData(res.data)
        console.log(res.data)
    }
    //add guildRosterData & populate roster data based on api call
    const getRosterData = async () => {
        await axios.get(URLStart+charSvcPort+"/characters/msg"+guildId)
        await axios.get(URLStart+guildSvcPort+"/guilds/addchars")
        const res = await axios.get(URLStart+guildSvcPort+"/guilds/getroster"+guildId)

        setGuildRoster(res.data)
        console.log(res.data)
    }   
    //add character to guild roster
    const updateCharGuildInfo = async () => {
        var char = {
            "guildid": guildIdUpdate,
            "guildrole": guildRoleUpdate,
            }
        await axios.put(URLStart+charSvcPort+"/characters/updateguild"+charIdUpdate, char)
    }

    //variables for update guild
    const [charIdUpdate, setcharIdUpdate] = useState();
    const [guildIdUpdate, setguildIdUpdate] = useState();
    const [guildRoleUpdate, setguildRoleUpdate] = useState();

    //variables for table display
    const [guildData, setGuildData] = useState();
    const [guildRoster, setGuildRoster] = useState();
    const [guildId, setGuildId] = useState();

    return (
    <div className='home'>
        {!!guildData ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Owner ID</TableCell>
                            <TableCell align="right">Guild Id</TableCell>
                            <TableCell align="right">Bio</TableCell>
                            <TableCell align="right">Progression</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guildData.map((row) => (
                            <TableRow
                                key={row.userid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.userid}
                                </TableCell>
                                <TableCell align="right">{row.guildid}</TableCell>
                                <TableCell align="right">{row.bio}</TableCell>
                                <TableCell align="right">{row.progression}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        : "No data"}

        <div className='btnContainer'>
            <button onClick={getGuildData}>Populate Guilds</button>
        </div>
    

    {!!guildRoster ?
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
                {guildRoster.map((row) => (
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
            <button onClick={getRosterData}>Populate Roster</button>
        </div>
            <div className='btnContainer'>
                <form>
                    <label>Enter Guild ID
                        <input
                        type="string"
                        value={guildId}
                        onChange={(e) => setGuildId(e.target.value)}
                        />
                    </label>
                </form>
            </div>

            <div className='btnContainer'>
                <form>
                    <label>Char ID to add to guild
                        <input
                        type="string"
                        value={charIdUpdate}
                        onChange={(e) => setcharIdUpdate(e.target.value)}
                        />
                    </label>
                    <label>GuildID to add character to
                        <input
                        type="string"
                        value={guildIdUpdate}
                        onChange={(e) => setguildIdUpdate(e.target.value)}
                        />
                    </label>
                    <label>Guild Role for character
                        <input
                        type="string"
                        value={guildRoleUpdate}
                        onChange={(e) => setguildRoleUpdate(e.target.value)}
                        />
                    </label>
                </form>
                <div className='btnContainer'>
                        <button onClick={updateCharGuildInfo}>Update character guild info</button>
                </div>
            </div>
    </div>
    )
}