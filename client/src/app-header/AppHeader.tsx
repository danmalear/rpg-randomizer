import { AppShell, Center, Flex, Grid } from '@mantine/core';
import AppBreadcrumbs from './AppBreadcrumbs.tsx';
import AppHeaderMenu from './AppHeaderMenu.tsx';

export interface AppHeaderProps extends React.PropsWithChildren {
	title: React.ReactNode;
	menuOptions?: React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, menuOptions }) => {
	return (
		<AppShell.Header px="sm">
			<Center h="100%" w="100%">
				<Grid w="100%" gap={0} align="center">
					<Grid.Col span={4}>
						<AppBreadcrumbs />
					</Grid.Col>
					<Grid.Col span={4}>
						<Center>
							{typeof title === 'string' ? <h2>{title}</h2> : title}
						</Center>
					</Grid.Col>
					<Grid.Col span={4}>
						<Flex direction="row" justify="end">
							<AppHeaderMenu>{menuOptions}</AppHeaderMenu>
						</Flex>
					</Grid.Col>
				</Grid>
			</Center>
		</AppShell.Header>
	);
};

export default AppHeader;
