import { Menu, Avatar, Switch } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());
  }
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target><div className="flex cursor-pointer items-center gap-2">
        <div>{user.name}</div>
        <Avatar src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : '/Avatar.png'} alt="it's me" />
      </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch size="sm" color="dark" className='cursor-pointer'
              onLabel={<IconSun
                size={14}
                stroke={2.5}
                color="yellow"
              />} offLabel={<IconMoonStars
                size={14}
                stroke={2.5}
                color="cyan"
              />}
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />
        
        <Menu.Item onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;