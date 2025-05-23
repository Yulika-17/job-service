import { Divider, RangeSlider } from "@mantine/core";

import { dropdownData } from "../../Data/JobsData";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";
import MultiInput from "./MultiInput";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 200]);
    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));
    }
    return (
        <div className="px-5 py-8 items-center !text-mine-shaft-100 flex">
            {
                dropdownData.map((item, index) => {
                    return <React.Fragment key={index}><div className="w-1/5"><MultiInput title={item.title} icon={item.icon} options={item.options} />
                    </div>
                        <Divider mr="xs" size="xs" orientation="vertical" /></React.Fragment>

                })
            }
            <div className="w-1/5 text-sm text-mine-shaft-300 [&_.mantine-Slider-label]:!translate-y-10">
                <div className="flex mb-1 justify-between">
                    <div>Зарплата</div>
                    <div>₽{value[0]} тыс. - ₽{value[1]} тыс.</div>
                </div>
                <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange} />
            </div>
        </div>
    )
}
export default SearchBar;