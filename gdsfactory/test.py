import gdsfactory as gf
import sky130
import sky130.pcells as pcells
import sky130.config as cf
import sky130.tech as st

# create the Component demo_connect
c = gf.Component("demo_connect")

# create two nmos pcells with default size
nm1 = pcells.nmos()
nm2 = pcells.nmos()

# add a GATE connection port to the nmos cells
nm1.add_port(name="M1_GATE", center=(0.4,0.7), width=10,layer=(68, 20), port_type='electrical')
nm2.add_port(name="M2_GATE", center=(0.4,0.7), width=10,layer=(68, 20), port_type='electrical')

# add the transistor to the demo_connect component
m1 = c << nm1
m2 = c << nm2

# move 2.6um m2 transistor along x axis
m2.move((2.6, 0))

# create a METAL 1 route between m1 and m2 transistor gates
route = gf.routing.get_route_electrical(m1.ports["M1_GATE"], m2.ports["M2_GATE"], cross_section=st.xs_metal1)
c.add(route.references)

# display the layout in Klayout
c.show()

# display the layout in 3D
scene = c.to_3d()
scene.show()