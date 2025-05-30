// import { useEffect, useState } from 'react';
// import { Checkbox, CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
// import { IconSearch, IconSelector } from '@tabler/icons-react';
// import { useDispatch } from 'react-redux';
// import { updateFilter } from '../../Slices/FilterSlice';

// const MultiInput = (props: any) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     setData(props.options);
//   }, [])
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//     onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
//   });

//   const [search, setSearch] = useState('');
//   const [data, setData] = useState<string[]>([]);
//   const [value, setValue] = useState<string[]>([]);

//   const exactOptionMatch = data.some((item) => item === search);

//   const handleValueSelect = (val: string) => {
//     setSearch('');

//     if (val === '$create') {
//       setData((current) => [...current, search]);
//       setValue((current) => [...current, search]);
//       dispatch(updateFilter({ [props.title]: [...value, search] }));
//     } else {
//       dispatch(updateFilter({ [props.title]: value.includes(val) ? value.filter((v) => v !== val) : [...value, val] }));
//       setValue((current) =>
//         current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
//       );
//     }
//   };

//   const handleValueRemove = (val: string) => {
//     dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
//     setValue((current) => current.filter((v) => v !== val));
//   }
//   const values = value
//     .slice(0, 1)
//     .map((item) => (
//       <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
//         {item.length >= 10 ? item.substring(0, 8) + ".." : item}
//       </Pill>
//     ));

//   const options = data.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
//     <Combobox.Option value={item} key={item} active={value.includes(item)}>
//       <Group gap="sm">
//         <Checkbox size='xs' color='brightSun.4'
//           checked={value.includes(item)}
//           onChange={() => { }}
//           aria-hidden
//           tabIndex={-1}
//           style={{ pointerEvents: 'none' }}
//         />
//         <span className='text-mine-shaft-300'>{item}</span>
//       </Group>
//     </Combobox.Option>
//   ));

//   return (
//     <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
//       <Combobox.DropdownTarget>
//         <PillsInput variant='unstyled' rightSection={<IconSelector />} onClick={() => combobox.toggleDropdown()}
//           leftSection={
//             <div className='text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2'><props.icon size={20} /></div>
//           }
//         >
//           <Pill.Group>
//             {value.length > 0 ? (
//               <>
//                 {values}
//                 {value.length > 1 && (
//                   <Pill>+{value.length - 1} ещё</Pill>
//                 )}
//               </>
//             ) : (
//               <Input.Placeholder className='!text-mine-shaft-300'>{props.title}</Input.Placeholder>
//             )}
//           </Pill.Group>
//         </PillsInput>
//       </Combobox.DropdownTarget>

//       <Combobox.Dropdown>
//         <Combobox.Search
//           value={search}
//           onChange={(event) => setSearch(event.currentTarget.value)}
//           placeholder="Поиск"
//         />
//         <Combobox.Options style={{ maxHeight: 200, overflowY: 'auto' }}>
//           {options}

//           {!exactOptionMatch && search.trim().length > 0 && (
//             <Combobox.Option value="$create">+ Создать {search}</Combobox.Option>
//           )}

//           {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
//             <Combobox.Empty>Ничего не найдено</Combobox.Empty>
//           )}
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//   );
// }
// export default MultiInput;
import { useEffect, useState } from 'react';
import {
  Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox
} from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

const MultiInput = (props: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  useEffect(() => {
    setData(props.options);
  }, []);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');
    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({ [props.title]: [...value, search] }));
    } else {
      const newValue = value.includes(val)
        ? value.filter((v) => v !== val)
        : [...value, val];
      setValue(newValue);
      dispatch(updateFilter({ [props.title]: newValue }));
    }
  };

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val);
    setValue(newValue);
    dispatch(updateFilter({ [props.title]: newValue }));
  };

  const values = value.slice(0, 1).map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item.length >= 10 ? item.substring(0, 8) + ".." : item}
    </Pill>
  ));

  const options = data
    .filter((item) =>
      item.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          <Checkbox
            size="xs"
            color="brightSun.4"
            checked={value.includes(item)}
            onChange={() => { }}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span className="text-mine-shaft-300">{item}</span>
        </Group>
      </Combobox.Option>
    ));

  let hoverTimeout: NodeJS.Timeout;

  const handleEnter = () => {
    clearTimeout(hoverTimeout);
    setIsHovering(true);
    combobox.openDropdown();
  };

  const handleLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsHovering(false);
      combobox.closeDropdown();
    }, 200); // задержка, чтобы избежать случайного закрытия
  };

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Combobox.DropdownTarget>
          <PillsInput
            variant="unstyled"
            rightSection={<IconSelector />}
            leftSection={
              <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
                <props.icon size={20} />
              </div>
            }
          >
            <Pill.Group>
              {value.length > 0 ? (
                <>
                  {values}
                  {value.length > 1 && <Pill>+{value.length - 1} ещё</Pill>}
                </>
              ) : (
                <Input.Placeholder className="!text-mine-shaft-300">
                  {props.title}
                </Input.Placeholder>
              )}
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Поиск"
          />
          <Combobox.Options style={{ maxHeight: 200, overflowY: 'auto' }}>
            {options}
            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Создать {search}
              </Combobox.Option>
            )}
            {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
              <Combobox.Empty>Ничего не найдено</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </div>
    </Combobox>
  );
};

export default MultiInput;
