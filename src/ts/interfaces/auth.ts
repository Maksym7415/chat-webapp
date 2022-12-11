export interface IAuthField {
  fieldName: string;
  placeholder: string;
  validate: {
    required?: string;
    pattern?: any;
  };
  styles: { [x: string]: React.CSSProperties };
}
