run:
	yarn build

copy:
	scp -r ./build/* hoangld4@10.109.3.83:/home/hoangld4/demo/web-in-app

login:
	ssh hoangld4@10.109.3.83

build: run copy login

#in server dev: sudo su
#and, type: make build-web-in-app
