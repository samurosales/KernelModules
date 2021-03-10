##CONSTRUIR EL FRONTEND
cd FRONTEND/so-p-01-client/
npm install
npm run build

cd ../..
##LEVANTAR EL SERVIDOR
cd BACKEND
export GOROOT=/usr/local/go
export GOPATH=$HOME/Projects/Proj1
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
echo ">> Version de Go"
go version
echo ">> Obteniendo librerias necesarias"
go get -u github.com/gin-gonic/gin
echo ">> Construyendo aplicacion"
go build -o ___go_build_so_p_01_ .
echo ">> Iniciando servidor"
./___go_build_so_p_01_
