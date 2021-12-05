
function Layout({children}) {
    return (
      <div>
        <h5>Navbar here</h5>
        {children}
        <h5>Footer here</h5>
      </div>
    );
}

export default Layout