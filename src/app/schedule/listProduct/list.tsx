import React, { useState } from 'react'
import InfoCard from '../infoCard'

const DataList = () => {
    return (
        <div>
            {/* <InfoCard Schedule={getData}></InfoCard> */}
            <div className="flex justify-between mt-4 space-x-2">
                <button className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-sm">
                    Изменить
                </button>
                <button className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-sm">
                    Удалить
                </button>
            </div>
        </div>
    )
}

export default DataList