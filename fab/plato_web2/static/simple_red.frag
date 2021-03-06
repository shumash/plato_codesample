#extension GL_OES_standard_derivatives : enable

varying vec3 vPosition;

vec3 getNormal() {
  // Differentiate the position vector
  vec3 dPositiondx = dFdx(vPosition);
  vec3 dPositiondy = dFdy(vPosition);

  // The normal is the cross product of the differentials
  return normalize(cross(dPositiondx, dPositiondy));
}

void main() {
  vec3 uLight = vec3(10, 10, 10);
  vec4 color = vec4(1.0, 0, 0, 1.0);
  vec4 dark = vec4(0, 0, 0, 1.0);
  vec4 light = vec4(1.0, 1.0, 1.0, 1.0);
  vec3 normal = getNormal();

  // Mix in diffuse light
  float diffuse = dot(normalize(uLight - vPosition), normal);
  diffuse = max(0.0, diffuse);
  color = mix(dark, color, 0.1 + 0.9 * diffuse);


  // Mix in specular light
  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(uLight - vPosition));
  float specular = dot(normal, halfVector);
  specular = max(0.0, specular);
  specular = pow(specular, 50.0);
  color = mix(color, light, 0.5 * specular);

  gl_FragColor = vec4(color);

}
