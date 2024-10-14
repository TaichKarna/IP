export const PASSWORD_REQUIREMENTS = [
  { id: 1, text: '• At least 8 characters', regex: /.{8,}/ },
  { id: 2, text: '• At least 1 uppercase letter', regex: /[A-Z]/ },
  {
    id: 3,
    text: '• At least 4 numbers',
    regex: /^(?=(?:.*\d){4}).*$/,
  },
  {
    id: 4,
    text: '• At least 1 symbol',
    regex: /(?=.*[-+_!@#$%^&*.,?])/,
  },
];
