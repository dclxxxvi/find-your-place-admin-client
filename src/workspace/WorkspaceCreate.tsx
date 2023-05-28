import * as React from 'react';
import { Create, ImageInput, SimpleForm, TextInput } from "react-admin";

const WorkspaceCreate: React.FC = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput name={'title'} source={'title'} label={'Название'}/>
                <TextInput name={'description'} source={'description'} label={'Описание'}/>
                <ImageInput name={'images'} source={'images'} />
                <TextInput name={'title'} source={'title'} label={'Название'}/>
                <TextInput name={'title'} source={'title'} label={'Название'}/>
            </SimpleForm>
        </Create>
    );
};

export default WorkspaceCreate;