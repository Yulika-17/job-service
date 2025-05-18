import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../../Data/Data";

const Testimonials=()=>{
    return <div className="mt-20 pb-5">
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">Что <span className="text-bright-sun-400">пользователи</span> говорят о нас?</div>
        <div className="flex justify-evenly">
            {
                testimonials.map((data, index)=><div key={index} className="flex flex-col gap-3 w-[23%] border-bright-sun-400 p-3 border rounded-xl mt-10">
                    <div className="flex gap-2 items-center">
                        <Avatar className="!h-14 !w-14" src="avatar.png" alt="it's me" />
                        <div>
                            <div className="text-lg text-mine-shaft-100 font-semibold">{data.name}</div>
                            <Rating value={data.rating} fractions={2} readOnly />
                        </div>
                    </div>
                    <div className="text-xs text-mine-shaft-300">{data.testimonial}</div>
                </div>)
            }
        </div>
    </div>
}
export default Testimonials;