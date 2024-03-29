import { TextField, Tooltip } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';

/**
 * Objet qui permet d'avoir les props de formik plus les attributs que le veut custom
 */
type MyInputProps = FieldHookConfig<string> & {
    required?: boolean;
    id: string;
    label?: any;
    name: string;
    type?: string;
    maxDate?: string;
    tooltipMessage?: string | number | null;
    handleChange?: any;
    InputProps?: any;
    autoComplete?: string;
    multiline?: boolean;
    maxRows?: number;
    maxLength?: number;
    rows?: number;
    disabled?: boolean;
    placeholder?: string;
    accept?: string;
};

/**
 * Composant select
 * @param props MyInputProps
 * @constructor
 */
export default function InputForm(props: MyInputProps) {
    const [field, meta] = useField(props);

    //Création du champ input
    const input = (
        <TextField
            {...field}
            required={props.required}
            id={props.id}
            label={props.label}
            name={props.name}
            type={props.type}
            fullWidth
            data-testid={props.id}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && Boolean(meta.error) && meta.error}
            inputProps={{
                max: props.type === 'date' ? props.maxDate : undefined,
                maxLength: props.maxLength,
                placeholder: props.placeholder ? props.placeholder : undefined,
                accept: props.accept ? props.accept : undefined,
            }}
            InputLabelProps={{ shrink: props.type === 'date' || props.type === 'file' ? true : undefined }}
            InputProps={props.InputProps}
            autoComplete={props.autoComplete}
            multiline={props.multiline}
            maxRows={props.maxRows}
            rows={props.rows}
            disabled={props.disabled}
            placeholder={props.placeholder}
            variant="standard"
        ></TextField>
    );
    //On retourne le composant
    //Soit avec un tooltip si demandé sinon juste le input
    if (props.tooltipMessage) {
        return (
            <Tooltip title={props.tooltipMessage} arrow>
                {input}
            </Tooltip>
        );
    } else {
        return input;
    }
}
