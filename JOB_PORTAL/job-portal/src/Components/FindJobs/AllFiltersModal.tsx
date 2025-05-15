import { Modal, Button, Group, ScrollArea, Divider } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import MultiInput from "./MultiInput";
import { studentFilters } from "../../Data/JobsData";

const AllFiltersModal = ({ opened, close }: { opened: boolean, close: () => void }) => {
    return (
        <Modal opened={opened} onClose={close} title="All Filters" size="lg" scrollAreaComponent={ScrollArea.Autosize}>
            <div className="grid grid-cols-2 gap-4">
                {studentFilters.map((filter, index) => (
                    <div key={index} className="col-span-1">
                        <MultiInput title={filter.title} icon={filter.icon} options={filter.options} />
                    </div>
                ))}
            </div>
            <Divider my="md" />
            <Group justify="flex-end">
                <Button variant="outline" leftSection={<IconX size={18} />} onClick={close}>
                    Cancel
                </Button>
                <Button color="brightSun.4" onClick={close}>
                    Apply Filters
                </Button>
            </Group>
        </Modal>
    );
};

export default AllFiltersModal;
// import { Modal, Button, Group, ScrollArea, Divider, Checkbox } from "@mantine/core";
// import { IconX } from "@tabler/icons-react";
// import { studentFilters } from "../../Data/JobsData";

// const AllFiltersModal = ({ opened, close }: { opened: boolean, close: () => void }) => {
//     return (
//         <Modal opened={opened} onClose={close} title="All Filters" size="lg" scrollAreaComponent={ScrollArea.Autosize}>
//             <div className="grid grid-cols-2 gap-4">
//                 {studentFilters.map((filter, index) => (
//                     <div key={index} className="col-span-1">
//                         <div className="flex items-center gap-2 mb-2">
//                             <filter.icon size={24} />
//                             <div className="font-semibold text-lg">{filter.title}</div>
//                         </div>
//                         <div>
//                             {filter.options.map((option, idx) => (
//                                 <Checkbox key={idx} label={option} style={{ marginBottom: 4 }} />
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <Divider my="md" />
//             <Group justify="flex-end">
//                 <Button variant="outline" leftSection={<IconX size={18} />} onClick={close}>
//                     Cancel
//                 </Button>
//                 <Button color="brightSun.4" onClick={close}>
//                     Apply Filters
//                 </Button>
//             </Group>
//         </Modal>
//     );
// };

// export default AllFiltersModal;
