import React from 'react';
import Weather from './Weather/Weather';
import Nasa from './NASA/Nasa';
import Restaurant from './Restaurant/Restaurant';

//Material UI
import {makeStyles} from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const useStyle = makeStyles({
    show: {
        display: 'flex',
        justifyContent: 'center',
    }
})

const Display = (props) => {
    let classes = useStyle()
    return(
        <div>
            <section className={classes.show}>
            <Weather />
            <Nasa />
            </section>
            <Restaurant />
        </div>
    )
}


export default Display;