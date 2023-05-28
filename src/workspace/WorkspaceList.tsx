import * as React from 'react';
import {
	Button,
	Datagrid,
	DeleteWithConfirmButton,
	EditButton,
	List,
	TextField,
	useDelete,
	useRecordContext
} from "react-admin";

const WorkspaceList: React.FC = () => {
    return (
		<List>
			<Datagrid rowClick={'show'}>
				<TextField source="title" label={'Название'}/>
				<TextField source="description" label={'Описание'}/>
				<TextField source="location_value" label={'Адрес'}/>
				<TextField source="status.name" label={'Cтатус'}/>
				{/*<TextField source="id" />*/}
				{/*<DateField source="published_at" />*/}
				{/*<TextField source="average_note" />*/}
				{/*<TextField source="views" />*/}
				{/*<EditButton />*/}
				<DeleteWithConfirmButton />
			</Datagrid>
		</List>
    );
};

export default WorkspaceList;