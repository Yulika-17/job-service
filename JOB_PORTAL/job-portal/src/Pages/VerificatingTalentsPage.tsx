import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindTalent/SearchBar";
import VerificatingTalents from "../Components/VerificatingProfiles/VerificatingTalents";

const VerificatingTalentsPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['montserrat']">
            {/* <Divider size="xs" mx="md"/>
            <SearchBar/> */}
            <Divider size="xs" mx="md" />
            <VerificatingTalents/>
        </div>
    )
}
export default VerificatingTalentsPage;