import React from 'react';


const Page404 = () => {

    return (
        <div className="col-12 xl:col-12">
            <div className="card">
                <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div className="text-700 text-center">
                        <div className="text-900 font-bold text-5xl mb-3">404</div>
                        <div className="text-700 text-2xl mb-5">No se encuentra la página</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Page404)
