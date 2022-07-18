import React from 'react';
import { InputText } from 'primereact/inputtext';

const LogIn = () => {

    return(
        <div> 

              <span className="p-float-label">
                        <InputText id="username" type="text" />
                        <label htmlFor="username">Username</label>
                    </span>
        </div>
    )

    //value={floatValue} onChange={(e) => setFloatValue(e.target.value)} 
}

export default LogIn