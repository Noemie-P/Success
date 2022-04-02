import Vue from "vue";
import Router from "vue-router";
import creation from "../views/collab/CreerQuestionnaire.vue";
import PasserQuestionnaire from "../views/collab/PasserQuestionnaire.vue";
import RejoindreQuestionnaire from "../views/collab/rejoindreQuestionnaire.vue";
import InfoQuestionnaire from "../views/collab/infoQuestionnaire.vue";
import { isLoggedIn } from '../utils/auth';
//import { getUserInfo } from '../utils/auth';

Vue.use(Router);

const router = new Router({
   mode: "history",
   base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import ("../views/login.vue"),
    },
    {
      path: "/login2FA",
      name: "Login2FA",
      component: () => import ("../components/auth/login2FA.vue"),
    },
    {
      path: "/verify2FA",
      name: "Verify2FA",
      component: () => import ("../components/auth/verify2FA.vue"),
    },
    {
      path: "/inscription",
      name: "inscription",
      component:() => import ("../components/auth/inscription.vue")
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import ("../views/admin.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          name: "HomeAdmin",
          component:() => import ("../views/admin/homeAdmin.vue")
        },
        {
          path: "dashboard",
          name: "Dahboard",
          component:() => import ("../views/dashboard.vue")
        },
        {
          path: "creationQuestionnaire", 
          name: "CreationQuestionnaire",
          component: creation
        },
        {
          path: "createExam", 
          name: "CreateExam",
          component: () => import ("../views/admin/ExamCreate.vue")
        },
        {
          path: "creationQuestion", 
          name: "CreationQuestion",
          component: () => import ("../views/admin/CreerQuestion.vue")
        },
        {
          path: "updateQuestion", // /updateQuestion
          name: "UpdateQuestion",
          component: () => import ("../components/updateQuestion.vue")
        },
        {
          path: "questionsList", // /questionsList
          name: "questionsList",
          component: () => import ("../components/questionsList.vue")
        },
        {
          path: "newCategory", // /newCategory
          name: "newCategory",
          component: () => import ("../views/admin/newCategory.vue")
        },
        {
          path: "categoryList", // /categoryList
          name: "CategoryList",
          component: () => import ("../views/admin/categoryList.vue")
        },
        {
          path: "questionnaireList", // /questionnaireList
          name: "QuestionnaireList",
          component: () => import ("../views/questionnaireList.vue")
        },
        {
          path: "ToGrade",
          name: "ToGrade",
          component: () => import ("../views/admin/ToGrade.vue")
        },
        {
          path: "responses", // /responses
          name: "Response",
          component: () => import ("../views/admin/responses.vue")
        },
        {
          path: "register",
          name: "register",
          component:() => import ("../views/admin/register.vue")
        },
        {
          path: "register2FA",
          name: "register2FA",
          component: () => import ("../components/auth/register2FA.vue"),
        },
        {
          path: "UserList",
          name: "UserList",
          component: () => import ("../views/admin/userList.vue")
        },
        {
          path: "UpdateUser",
          name: "UpdateUser",
          component: () => import ("../views/admin/updateUser.vue")
        },
        {
          path: "createGroup", // /createGroup
          name: "CreateGroup",
          component:() => import ("../views/admin/newGroup.vue")
        },
        {
          path: "groupsList", // /groupsList
          name: "groupsList",
          component: () => import ("../views/admin/groupsList.vue")
        },
        {
          path: "UpdateGroup", // /UpdateGroup
          name: "UpdateGroup",
          component: () => import ("../views/admin/updateGroup.vue")
        },
        {
          path: "groupListToUsers", // /groupListToUsers
          name: "groupListToUsers",
          component: () => import ("../views/admin/groupListToUsers.vue")
        }
      ]
    },
    {
      path: "/collab",
      name: "collab",
      component: () => import ("../views/collab.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "", // /collab/home
          name: "HomeCollab",
          component:() => import ("../views/collab/homeCollab.vue")
        },
        {
          path: "dashboard", // /collab/dashboard
          name: "Dashboard",
          component:() => import ("../views/dashboard.vue")
        },
        {
          path: "rejoindreQuestionnaire", // /collab/rejoindreQuestionnaire
          name: "RejoindreQuestionnaire",
          component: RejoindreQuestionnaire
        },
        
        {
          path: "grading", // /grading
          name: "Grading",
          component:() => import ("../components/Grading.vue")
        },
      ]
    },
    {
      path: "/register",
      name: "register",
      component:() => import ("../views/admin/register.vue")
    },
    

      /*
      {
        path: "/collab/home", // /collab/home
        name: "HomeCollab",
        component:() => import ("../views/collab/homeCollab.vue")
      },
      {
        path: "/collab/dashboard", // /collab/dashboard
        name: "Dashboard",
        component:() => import ("../views/dashboard.vue")
      },
      {
        path: "/admin/home",
        name: "HomeAdmin",
        component:() => import ("../views/admin/homeAdmin.vue")
      },
      {
        path: "/admin/dashboard",
        name: "Dahboard",
        component:() => import ("../views/dashboard.vue")
      },
      {
        path: "/admin/creationQuestionnaire", // /creationQuestionnaire
        name: "CreationQuestionnaire",
        component: creation
      },
      {
        path: "/admin/createExam", // /createExam
        name: "CreateExam",
        component: () => import ("../views/admin/ExamCreate.vue")
      },
      {
        path: "/admin/creationQuestion", // /creationQuestion
        name: "CreationQuestion",
        component: () => import ("../views/admin/CreerQuestion.vue")
      },
      {
        path: "/admin/updateQuestion", // /updateQuestion
        name: "UpdateQuestion",
        component: () => import ("../components/updateQuestion.vue")
      },
      {
        path: "/admin/questionsList", // /questionsList
        name: "questionsList",
        component: () => import ("../components/questionsList.vue")
      },
      {
        path: "/admin/newCategory", // /newCategory
        name: "newCategory",
        component: () => import ("../views/admin/newCategory.vue")
      },
      {
        path: "/admin/categoryList", // /categoryList
        name: "CategoryList",
        component: () => import ("../views/admin/categoryList.vue")
      },*/
      {
        path: "/faireQuestionnaire", // /faireQuestionnaire
        name: "PasserQuestionnaire",
        component: PasserQuestionnaire
      },
      /*
      {
        path: "/rejoindreQuestionnaire", // /collab/rejoindreQuestionnaire
        name: "RejoindreQuestionnaire",
        component: RejoindreQuestionnaire
      },*/
      {
        path: "/infoQuestionnaire", // /infoQuestionnaire
        name: "InfoQuestionnaire",
        component: InfoQuestionnaire
      },
      {
        path: "/finQuestionnaire", // /finQuestionnaire
        name: "FinQuestionnaire",
        component:() => import ("../views/collab/finQuestionnaire.vue")
      },/*
      {
        path: "/collab/grading", // /grading
        name: "Grading",
        component:() => import ("../components/Grading.vue")
      },*/
      /*
      {
        path: "/admin/questionnaireList", // /questionnaireList
        name: "QuestionnaireList",
        component: () => import ("../views/questionnaireList.vue")
      },
      {
        path: "/admin/ToGrade",
        name: "ToGrade",
        component: () => import ("../views/admin/ToGrade.vue")
      },
      {
        path: "/admin/responses", // /responses
        name: "Response",
        component: () => import ("../views/admin/responses.vue")
      },
      {
        path: "/admin/register",
        name: "register",
        component:() => import ("../views/admin/register.vue")
      },*/
      {
        path: "/login",
        name: "login",
        component: () => import ("../views/login.vue")
      },
      /*
      {
        path: "/admin/UserList",
        name: "UserList",
        component: () => import ("../views/admin/userList.vue")
      },
      {
        path: "/admin/UpdateUser",
        name: "UpdateUser",
        component: () => import ("../views/admin/updateUser.vue")
      },
      {
        path: "/admin/createGroup", // /createGroup
        name: "CreateGroup",
        component:() => import ("../views/admin/newGroup.vue")
      },
      {
        path: "/admin/groupsList", // /groupsList
        name: "groupsList",
        component: () => import ("../views/admin/groupsList.vue")
      },
      {
        path: "/admin/UpdateGroup", // /UpdateGroup
        name: "UpdateGroup",
        component: () => import ("../views/admin/updateGroup.vue")
      },
      {
        path: "/admin/groupListToUsers", // /groupListToUsers
        name: "groupListToUsers",
        component: () => import ("../views/admin/groupListToUsers.vue")
      },*/
  ]
});

  router.beforeEach = ((to, from, next) =>{ 

    if (to.matched.some(record => record.meta.requiresAuth)) {

      if (isLoggedIn() == false) {
        console.log(isLoggedIn())
        next({
          path: "/login",
          query: {redirect: to.fullPath}
        })
      }
      else {
        next()
      }
    }
    else {
      next()
    }
    
    /*console.log (isLoggedIn())
    if (to.name == 'regiser' && !isLoggedIn()) {
      next({ path: '/admin/register' })
    }
    else if (!to.meta.allowAnonymous && !isLoggedIn()) {
     next({
       path: "/login"
     })
   }
   /*else {
    let user = getUserInfo();
    if (user.type == "collaborateur"){
      console.log(user.type);
      next({
        path: "/collab"
      })
    }
    else if (user.type == "correcteur"){
      console.log(user.type);
      next({
        path: "/admin"
      })
    }
    else {
      next({ path: '/' })
    } 
   }*/
  
  });

  export default router;



