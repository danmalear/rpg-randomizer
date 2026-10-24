import { Menu } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react';

const AppHeaderMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Menu>
				<Menu.Target>
					<IconDotsVertical cursor="pointer" />
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Label>Development</Menu.Label>
					{children}
				</Menu.Dropdown>
			</Menu>
		</>
	);
};

export default AppHeaderMenu;
