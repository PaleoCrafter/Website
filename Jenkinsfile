node {
    stage("checkout") {
        git branch: 'development', url: 'https://github.com/Diluv/Website'
    }

    stage("build") {
        sh 'npm install'
        sh 'npm run staging'
    }

    stage("deploy") {
        if (env.BRANCH_NAME == 'master') {

        } else {
            ansiblePlaybook('deploy/dev-deploy.yml')
        }
    }
}