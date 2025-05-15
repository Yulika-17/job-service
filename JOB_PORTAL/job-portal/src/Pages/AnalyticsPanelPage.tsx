import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindTalent/SearchBar";
import AnalyticsPanel from "../Components/Analytics/AnalyticsPanel";

const AnalyticsPanelPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['montserrat']">
            <Divider size="xs" mx="md" />
            <AnalyticsPanel/>
        </div>
    )
}
export default AnalyticsPanelPage;