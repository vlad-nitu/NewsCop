import 'bootstrap/dist/css/bootstrap.min.css'

const TextBox = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='form-group'>
        <label htmlFor='textBox'>Text Box</label>
        <textarea type='text' className='form-control custom-textbox' id='textBox' rows='10' />
      </div>
    </div>
  )
}
export default TextBox
