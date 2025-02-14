import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {},
  label: {
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 22,
  },
  labelWrapper: {
    flexDirection: 'row',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 20,
    paddingLeft: 13,
  },
  required: {
    color: 'red',
    marginLeft: 4,
    marginTop: 4,
  },
  button: {
    paddingHorizontal: 21,
    height: 40,
    width: 130,
    backgroundColor: '#138808',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'flex-start',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
});

export default styles;
