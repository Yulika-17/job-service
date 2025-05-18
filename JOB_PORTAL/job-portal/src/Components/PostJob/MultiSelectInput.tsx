import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox, Chip, CloseButton, Group, Box, Badge } from '@mantine/core';

const MultiSelectInput = (props: any) => {
    useEffect(() => {
        setData(props.options || []);
        setValue(props.form.getInputProps(props.name).value || []);
    }, [props]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleAddOption = (val: string) => {
        if (!value.includes(val)) {
            const newValue = [...value, val];
            setValue(newValue);
            props.form.setFieldValue(props.name, newValue);
            setSearch('');
        }
    };

    const handleRemoveOption = (val: string) => {
        const newValue = value.filter((item) => item !== val);
        setValue(newValue);
        props.form.setFieldValue(props.name, newValue);
    };

    return (
        <Box>
            <Combobox
                store={combobox}
                withinPortal={false}
                onOptionSubmit={(val) => {
                    if (val === '$create') {
                        setData((current) => [...current, search]);
                        handleAddOption(search);
                    } else {
                        handleAddOption(val);
                    }
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <InputBase
                        label={props.label}
                        withAsterisk
                        placeholder={props.placeholder}
                        value={search}
                        onChange={(event) => {
                            combobox.openDropdown();
                            combobox.updateSelectedOptionIndex();
                            setSearch(event.currentTarget.value);
                        }}
                        onFocus={() => combobox.openDropdown()}
                        onClick={() => combobox.openDropdown()}
                        onBlur={() => combobox.closeDropdown()}
                        rightSection={<Combobox.Chevron />}
                        rightSectionPointerEvents="none"
                    />
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>
                        <ScrollArea.Autosize mah={200} type="scroll">
                            {options}
                            {!exactOptionMatch && search.trim().length > 0 && (
                                <Combobox.Option value="$create">+ Создать "{search}"</Combobox.Option>
                            )}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>

            {value.length > 0 && (
                <Group gap="xs" mt="xs" wrap="wrap">
                    {value.map((item) => (
                        <Badge
                            key={item}
                            variant="light"
                            color="blue"
                            radius="sm"
                            rightSection={
                                <CloseButton
                                    onClick={() => handleRemoveOption(item)}
                                    variant="transparent"
                                    size="xs"
                                    aria-label="Remove"
                                />
                            }
                        >
                            {item}
                        </Badge>
                    ))}
                </Group>
            )}
        </Box>
    );
};

export default MultiSelectInput;
