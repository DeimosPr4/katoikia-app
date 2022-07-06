import React from 'react';

const LogIn = () => {

    return(
        <div> 
              <span className="p-float-label">
                        <InputText id="username" type="text" value={floatValue} onChange={(e) => setFloatValue(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>
        </div>
    )
}

export default LogIn