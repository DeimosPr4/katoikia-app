import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

const FormAdminSistema = () => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Advanced</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Firstname</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
                            <InputTextarea id="address" rows="4" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">City</label>
                            <InputText id="city" type="text" />
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">State</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="zip">Zip</label>
                            <InputText id="zip" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormAdminSistema, comparisonFn);
